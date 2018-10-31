class ReservationsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    reservation = Reservation.create(
      flight_id: params[:flight_id],
      user_id: params[:user_id],
      row: params[:row],
      column: params[:column]
    )
    if reservation.persisted?
      render json: {
        created: true
      }
    else
      render json: {
        created: false,
        errors: reservation.errors.messages
      }
    end
  end

  def index
    render json: Reservation.all.reverse
  end

  def destroy
    reservation = Reservation.find(params[:id])
    reservation.destroy
  end

end
