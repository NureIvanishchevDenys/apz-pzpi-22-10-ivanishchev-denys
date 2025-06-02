package com.example.aquasafe.data.model

data class Parameter(
    val parameter_id: Int,
    val name: String,
    val unit: String,
    val safe_min: Double?,
    val safe_max: Double?
)