class FlightsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    flight = Flight.create flight_params
    redirect_to flights_path
  end

  def show
    flight = Flight.find(params[:id])
    reservations = flight.reservations
    rowColumns = [];
    for i in 0..reservations.length-1
      rowColumns << (reservations[i].row.to_s + reservations[i].column.to_s)
    end
    plane = {
      bookings: []
    }
    for i in 0..flight.plane.rows-1 do
      plane[:bookings] << [];
      for j in 0..flight.plane.columns-1 do
        rc = i.to_s + j.to_s
        if ( rowColumns.include?(rc))
          plane[:bookings][i] << false;
        else
          plane[:bookings][i] << true;
        end
      end
    end
    jsonPlane = plane.to_json.html_safe
    render json: jsonPlane
  end

  def index
    @flights = Flight.all
    @flight = Flight.new
  end

  def search
    flights = Flight.where(origin: params[:origin]).where(destination: params[:destination])
    render json: flights
  end

  def destroy
    flight = Flight.find(params[:id])
    flight.destroy
  end

  private

  def flight_params
    params.require(:flight).permit(:origin, :destination, :date, :plane_id)
  end

end
