package com.example.aquasafe.data.model

data class Station(
    val station_id: Int,
    val name: String,
    val location: String,
    val latitude: Double?,
    val longitude: Double?
)