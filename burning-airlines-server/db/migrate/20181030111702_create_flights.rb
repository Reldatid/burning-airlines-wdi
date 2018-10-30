class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.integer :plane_id
      t.date :date
      t.text :destination
      t.text :origin

      t.timestamps
    end
  end
end
