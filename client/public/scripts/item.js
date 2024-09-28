const renderItem = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/items')
    const data = await response.json()
    const itemContent = document.getElementById('item-content')
    let item
    item = data.find(item => item.id === requestedID)
    if (item) {
        document.getElementById('imageUrl').src = item.imageUrl
        document.getElementById('name').textContent = item.name
        document.getElementById('calories').textContent = item.calories + ' Calories'
        document.title = `Listicle - ${item.name}`
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Menu Items Available 😞'
        itemContent.appendChild(message)
    }
}
renderItem()