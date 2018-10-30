class FlightsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    flight = Flight.create flight_params
    redirect_to flights_path
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
