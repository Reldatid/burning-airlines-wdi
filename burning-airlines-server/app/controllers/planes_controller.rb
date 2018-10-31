class PlanesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
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
    @select_columns = [['1 (A)', 1], ['2 (B)', 2], ['3 (C)', 3], ['4 (D)', 4], ['5 (E)', 5], ['6 (F)', 6], ['7 (G)', 7], ['8 (H)', 8], ['9 (I)', 9], ['10 (J)', 10]]
    @select_rows = (5..50)
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
