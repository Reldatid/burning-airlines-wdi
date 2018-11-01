class FlightsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    flight = Flight.create flight_params
    unless flight.persisted?
      flash[:errors] = flight.errors.messages
    end
    redirect_to flights_path
  end

  def show
    user = User.first
    flight = Flight.find(params[:id])
    reservations = flight.reservations
    rowColumns = [];
    for i in 0..reservations.length-1
      rowColumns << (reservations[i].row.to_s + reservations[i].column.to_s)
    end
    plane = {
      user_id: user.id,
      bookings: []
    }
    for i in 0..flight.plane.rows-1 do
      plane[:bookings] << [];
      for j in 0..flight.plane.columns-1 do
        rc = i.to_s + j.to_s
        if ( rowColumns.include?(rc))
          seat = reservations.select{ |item| item[:row] == i && item[:column] == j }
          id = seat[0][:user_id]
          plane[:bookings][i] << id
        else
          plane[:bookings][i] << 0
        end
      end
    end
    jsonPlane = plane.to_json.html_safe
    render json: jsonPlane
  end

  def index
    if flash[:errors]
      @errors = flash[:errors]
    end
    @flights = Flight.all.sort_by(&:date)
    @flight = Flight.new
    @planes = Plane.all.map{|plane| [plane.name, plane.id]}
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
