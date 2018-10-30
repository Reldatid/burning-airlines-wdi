class PlanesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    puts "="*50
    puts plane_params
    plane = Plane.create( plane_params )
    redirect_to planes_path
  end

  def show
    plane = Plane.find(params[:id])
    render json: {plane: plane, created: true}
  end

  def index
    @plane = Plane.new
    @planes = Plane.all
  end

  def destroy
    plane = Plane.find(params[:id])
    plane.destroy
  end

  private

  def plane_params
    params.require(:plane).permit(:name, :rows, :columns)
  end
end
