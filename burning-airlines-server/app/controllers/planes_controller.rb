class PlanesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    plane = Plane.create(
      name: params[:name],
      rows: params[:rows],
      columns: params[:columns]
    )
    redirect_to planes_path
  end

  def index
    @planes = Plane.all
  end

  def destroy
    plane = Plane.find(params[:id])
    plane.destroy
  end
end
