package com.example.aquasafe.ui.station

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aquasafe.R
import com.example.aquasafe.ui.viewmodel.StationViewModel
import com.example.aquasafe.ui.measurement.MeasurementActivity

class StationListActivity : AppCompatActivity() {

    private val viewModel: StationViewModel by viewModels()
    private lateinit var adapter: StationAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_station_list)

        adapter = StationAdapter { station ->
            // При клике переходим в MeasurementActivity и передаем id станции
            val intent = Intent(this, MeasurementActivity::class.java)
            intent.putExtra("station_id", station.station_id)
            startActivity(intent)
        }

        val recyclerView = findViewById<RecyclerView>(R.id.recyclerStations)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        viewModel.stations.observe(this) { list ->
            adapter.submitList(list)
        }

        viewModel.loadStations()
    }
}
