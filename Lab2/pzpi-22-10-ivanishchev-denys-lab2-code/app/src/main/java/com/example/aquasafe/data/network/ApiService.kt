package com.example.aquasafe.data.network

import retrofit2.http.GET

import com.example.aquasafe.data.model.*

interface ApiService {
    @GET("stations")
    suspend fun getStations(): List<Station>

    @GET("measurements")
    suspend fun getMeasurements(): List<Measurement>

    @GET("parameters")
    suspend fun getParameters(): List<Parameter>

    @GET("alerts")
    suspend fun getAlerts(): List<Alert>
}