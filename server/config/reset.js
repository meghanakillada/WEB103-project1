import { pool } from './database.js'
import './dotenv.js'
import itemData from '../data/items.js'

const createItemsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS items;

        CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            calories INT NOT NULL,
            imageURL VARCHAR(255) NOT NULL,
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 menu items table created successfully')
    } catch (err) {
        console.error('⚠️ error creating menu items table', err)
    }
}

const seedItemsTable = async () => {
    await createItemsTable()

    itemData.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO items (name, calories, imageUrl) VALUES ($1, $2, $3)'
        }

        const values = [
            item.name,
            item.calories,
            item.imageUrl,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting menu item', err)
                return
            }

            console.log(`✅ ${item.name} added successfully`)
        })
    })
}

seedItemsTable()