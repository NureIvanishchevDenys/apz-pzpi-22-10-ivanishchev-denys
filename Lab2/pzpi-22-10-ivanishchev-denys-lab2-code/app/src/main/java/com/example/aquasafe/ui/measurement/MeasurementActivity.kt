package com.example.aquasafe.ui.measurement

import com.example.aquasafe.R
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aquasafe.ui.viewmodel.StationViewModel
import androidx.activity.viewModels

class MeasurementActivity : AppCompatActivity() {
    private val viewModel: StationViewModel by viewModels()
    private var stationId: Int = 0

    private lateinit var adapter: MeasurementAdapter
    private var parameterMap: Map<Int, String> = emptyMap()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_measurements)

        stationId = intent.getIntExtra("station_id", 0)

        val recyclerView = findViewById<RecyclerView>(R.id.recyclerMeasurements)
        adapter = MeasurementAdapter(parameterMap)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        // Наблюдаем параметры
        viewModel.parameters.observe(this) { params ->
            parameterMap = params.associate { it.parameter_id to it.name }
            adapter.updateParameterMap(parameterMap) // Обновляем адаптер
            updateMeasurements()
        }

        // Наблюдаем измерения
        viewModel.measurements.observe(this) {
            updateMeasurements()
        }

        // Загружаем данные
        viewModel.loadParameters()
        viewModel.loadMeasurements()
    }

    private fun updateMeasurements() {
        val measurements = viewModel.measurements.value ?: emptyList()
        val filtered = measurements.filter { it.station_id == stationId }
        adapter.submitList(filtered)
    }
}
