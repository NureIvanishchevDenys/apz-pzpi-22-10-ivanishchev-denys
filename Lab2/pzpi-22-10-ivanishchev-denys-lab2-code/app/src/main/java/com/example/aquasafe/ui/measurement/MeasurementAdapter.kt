package com.example.aquasafe.ui.measurement

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aquasafe.R
import com.example.aquasafe.data.model.Measurement

class MeasurementAdapter(
    private var parameters: Map<Int, String> = emptyMap()
) : RecyclerView.Adapter<MeasurementAdapter.MeasurementViewHolder>() {

    private var measurements: List<Measurement> = emptyList()

    fun submitList(list: List<Measurement>) {
        measurements = list
        notifyDataSetChanged()
    }

    fun updateParameterMap(newMap: Map<Int, String>) {
        parameters = newMap
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MeasurementViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_measurement, parent, false)
        return MeasurementViewHolder(view)
    }

    override fun onBindViewHolder(holder: MeasurementViewHolder, position: Int) {
        val measurement = measurements[position]
        val paramName = parameters[measurement.parameter_id] ?: "Unknown"
        holder.bind(measurement, paramName)
    }

    override fun getItemCount(): Int = measurements.size

    class MeasurementViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val textParameter: TextView = itemView.findViewById(R.id.textParameter)
        private val textValue: TextView = itemView.findViewById(R.id.textValue)
        private val textDate: TextView = itemView.findViewById(R.id.textDate)


        fun bind(measurement: Measurement, paramName: String) {
            textParameter.text = paramName
            textValue.text = measurement.value.toString()
            textDate.text = measurement.measured_at
        }

    }
}

