class FlightsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    flight = Flight.create(
      plane_id: params[:plane_id],
      date: params[:date],
      destination: params[:destination],
      origin: params[:origin]
    )

    redirect_to flights_path
  end

  def index
    @flights = Flight.all
  end

  def destroy
    flight = Flight.find(params[:id])
    flight.destroy
  end

end
