# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Plane.destroy_all
puts "Creating Planes..."

p1 = Plane.create name: '747', rows: 10, columns: 4
p2 = Plane.create name: '2PP', rows: 7, columns: 2

puts "Created #{Plane.all.length} Planes!"


Flight.destroy_all
puts "Creating Flights..."

f1 = Flight.create date:'2018/08/09', destination:'SFO', origin:'SYD', plane_id: p1.id
f2 = Flight.create date:'2018/07/09', destination:'SYD', origin:'BNE', plane_id: p2.id
f3 = Flight.create date:'2018/08/10', destination:'SFO', origin:'SYD', plane_id: p2.id

puts "Created #{Flight.all.length} Flights!"


User.destroy_all
puts "Creating Users..."

u1 = User.create name:'Phill Murray', email:'bill@fillmurray.com'

puts "Created #{User.all.length} Users!"


Reservation.destroy_all
puts "Creating Resevations..."

r1 = Reservation.create flight_id: f1.id, user_id: u1.id, row:5, column:2
r2 = Reservation.create flight_id: f2.id, user_id: u1.id, row:5, column:2

puts "Created #{Reservation.all.length} Reservations!"
