package com.example.aquasafe.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aquasafe.data.model.Parameter
import com.example.aquasafe.data.model.Measurement
import com.example.aquasafe.data.model.Station
import com.example.aquasafe.data.network.RetrofitClient
import kotlinx.coroutines.launch

class StationViewModel : ViewModel() {

    // Приватные мутабельные данные
    private val _stations = MutableLiveData<List<Station>>()
    val stations: LiveData<List<Station>> = _stations

    private val _measurements = MutableLiveData<List<Measurement>>()
    val measurements: LiveData<List<Measurement>> = _measurements

    private val _parameters = MutableLiveData<List<Parameter>>()
    val parameters: LiveData<List<Parameter>> = _parameters

    // Используем RetrofitClient, чтобы не создавать новый Retrofit
    private val api = RetrofitClient.apiService

    fun loadStations() {
        viewModelScope.launch {
            try {
                val list = api.getStations()
                _stations.postValue(list)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    fun loadMeasurements() {
        viewModelScope.launch {
            try {
                val list = api.getMeasurements()
                _measurements.postValue(list)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    fun loadParameters() {
        viewModelScope.launch {
            try {
                val list = api.getParameters()
                _parameters.postValue(list)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}
