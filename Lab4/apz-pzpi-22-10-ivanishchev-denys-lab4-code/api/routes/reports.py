from flask import Blueprint, jsonify, request, send_file
from io import StringIO, BytesIO
import csv
import pandas as pd
from models import db, Measurement, MonitoringStation, WaterQualityParameter

# Створюємо Blueprint для звітів
report_blueprint = Blueprint('report', __name__)

@report_blueprint.route('/export_report', methods=['GET'])
def export_report():
    # Отримуємо параметри з запиту
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    station_id = request.args.get('station_id')
    export_format = request.args.get('format', 'csv')  # За замовчуванням CSV
    
    # Базовий запит до таблиці Measurements
    query = db.session.query(
        Measurement.measurement_id,
        MonitoringStation.name.label('station_name'),
        MonitoringStation.location,
        WaterQualityParameter.name.label('parameter_name'),
        Measurement.value,
        Measurement.measured_at
    ).join(
        MonitoringStation, Measurement.station_id == MonitoringStation.station_id
    ).join(
        WaterQualityParameter, Measurement.parameter_id == WaterQualityParameter.parameter_id
    )
    
    # Фільтруємо за датами
    if start_date:
        query = query.filter(Measurement.measured_at >= start_date)
    if end_date:
        query = query.filter(Measurement.measured_at <= end_date)
    
    # Фільтруємо за станцією (якщо вказана)
    if station_id:
        query = query.filter(Measurement.station_id == station_id)
    
    # Виконуємо запит
    results = query.all()
    
    # Формуємо дані для експорту
    data = [{
        'measurement_id': row.measurement_id,
        'station_name': row.station_name,
        'location': row.location,
        'parameter_name': row.parameter_name,
        'value': float(row.value),
        'measured_at': row.measured_at.strftime('%Y-%m-%d %H:%M:%S')
    } for row in results]
    
    if export_format == 'csv':
        # Експортуємо у CSV
        output = StringIO()
        writer = csv.DictWriter(output, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
        output.seek(0)
    
        # Зберігаємо файл на сервері
        with open('report.csv', 'w', encoding='utf-8') as f:
            f.write(output.getvalue())

        return send_file(
            BytesIO(output.getvalue().encode()),
            mimetype='text/csv',
            as_attachment=True,
            download_name='report.csv'
        )

    
    elif export_format == 'excel':
    # Експортуємо у Excel
        df = pd.DataFrame(data)
        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Report')
        output.seek(0)

        # Зберігаємо файл на сервері
        with open('report.xlsx', 'wb') as f:
            f.write(output.getvalue())

        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name='report.xlsx'
        )

    
    else:
        return jsonify({'message': 'Invalid format. Use "csv" or "excel".'}), 400