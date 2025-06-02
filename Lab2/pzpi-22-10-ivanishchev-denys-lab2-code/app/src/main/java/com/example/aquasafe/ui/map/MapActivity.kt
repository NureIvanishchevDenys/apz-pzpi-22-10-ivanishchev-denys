package com.example.aquasafe.ui.map

import com.google.android.gms.maps.model.LatLngBounds
import com.example.aquasafe.R
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.aquasafe.data.network.RetrofitClient
import com.example.aquasafe.data.model.Station
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import android.content.Intent
import com.example.aquasafe.ui.measurement.MeasurementActivity

class MapActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var map: GoogleMap

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        map = googleMap
        fetchAndDisplayStations()
        map.setOnMarkerClickListener { marker ->
            val stationId = marker.tag as? Int
            if (stationId != null) {
                val intent = Intent(this, MeasurementActivity::class.java)
                intent.putExtra("station_id", stationId)
                startActivity(intent)
            }
            true // событие обработано
        }


    }

    private fun fetchAndDisplayStations() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val stations: List<Station> = RetrofitClient.apiService.getStations()
                runOnUiThread {
                    val builder = LatLngBounds.Builder()
                    stations.forEach { station ->
                        if (station.latitude != null && station.longitude != null) {
                            val position = LatLng(station.latitude, station.longitude)
                            map.addMarker(
                                MarkerOptions()
                                    .position(position)
                                    .title(station.name)
                                    .snippet(station.location)
                            )?.tag = station.station_id
                            builder.include(position)  // Добавляем координату в bounds
                        }
                    }
                    if (stations.isNotEmpty()) {
                        val bounds = builder.build()
                        val padding = 100 // отступ в пикселях
                        map.moveCamera(CameraUpdateFactory.newLatLngBounds(bounds, padding))
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }



}