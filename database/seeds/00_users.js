exports.seed = async function(knex) {
	await knex("cabinets").truncate()
	await knex("cabinets").insert([
		{ name: "Spacewar!" },
		{ name: "Street Fighter 2" },
		{ name: "Outrun" },
		{ name: "Giga Wing 2" },
	])
}