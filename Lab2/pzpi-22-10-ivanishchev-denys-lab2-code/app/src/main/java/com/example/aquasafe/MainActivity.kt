package com.example.aquasafe.ui.main

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.aquasafe.R
import com.example.aquasafe.ui.map.MapActivity
import com.example.aquasafe.ui.station.StationListActivity
import android.widget.Button


class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnStations = findViewById<Button>(R.id.btnStations)
        val btnMap = findViewById<Button>(R.id.btnMap)

        btnStations.setOnClickListener {
            startActivity(Intent(this, StationListActivity::class.java))
        }

        btnMap.setOnClickListener {
            startActivity(Intent(this, MapActivity::class.java))
        }
    }
}
