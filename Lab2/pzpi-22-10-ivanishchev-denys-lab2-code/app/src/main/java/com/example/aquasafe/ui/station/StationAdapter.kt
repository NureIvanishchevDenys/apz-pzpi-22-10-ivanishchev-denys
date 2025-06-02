package com.example.aquasafe.ui.station

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aquasafe.R
import com.example.aquasafe.data.model.Station

class StationAdapter(
    private var stations: List<Station> = emptyList(),
    private val onClick: (Station) -> Unit
) : RecyclerView.Adapter<StationAdapter.StationViewHolder>() {

    fun submitList(list: List<Station>) {
        stations = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StationViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_station, parent, false)
        return StationViewHolder(view)
    }

    override fun onBindViewHolder(holder: StationViewHolder, position: Int) {
        holder.bind(stations[position], onClick)
    }

    override fun getItemCount(): Int = stations.size

    class StationViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val textName: TextView = itemView.findViewById(R.id.textStationName)
        private val textLocation: TextView = itemView.findViewById(R.id.textStationLocation)

        fun bind(station: Station, onClick: (Station) -> Unit) {
            textName.text = station.name
            textLocation.text = station.location ?: "No location"
            itemView.setOnClickListener { onClick(station) }
        }
    }
}
