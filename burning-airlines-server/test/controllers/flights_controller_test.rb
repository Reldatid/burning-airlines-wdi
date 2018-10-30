require 'test_helper'

class FlightsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get flights_create_url
    assert_response :success
  end

  test "should get index" do
    get flights_index_url
    assert_response :success
  end

  test "should get destroy" do
    get flights_destroy_url
    assert_response :success
  end

end
