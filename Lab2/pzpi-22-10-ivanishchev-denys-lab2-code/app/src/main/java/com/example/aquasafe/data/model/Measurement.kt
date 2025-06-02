package com.example.aquasafe.data.model

data class Measurement(
    val measurement_id: Int,
    val station_id: Int,
    val parameter_id: Int,
    val value: Double,
    val measured_at: String
)