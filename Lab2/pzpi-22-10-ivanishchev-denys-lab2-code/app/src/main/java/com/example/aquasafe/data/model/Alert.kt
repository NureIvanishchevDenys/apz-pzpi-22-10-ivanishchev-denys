package com.example.aquasafe.data.model

data class Alert(
    val alert_id: Int,
    val station_id: Int,
    val parameter_id: Int,
    val value: Double,
    val message: String,
    val alert_time: String
)