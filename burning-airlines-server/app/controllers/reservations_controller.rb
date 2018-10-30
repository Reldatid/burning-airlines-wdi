class ReservationsController < ApplicationController

  def create
    reservation = Reservation.create(
      flight_id: params[:flight_id],
      user_id: params[:user_id],
      row: params[:row],
      column: params[:column]
    )
  end

  def index
    render json: Reservation.all.reverse
  end

  def destroy
    reservation = Reservation.find(params[:id])
    reservation.destroy
  end

end
