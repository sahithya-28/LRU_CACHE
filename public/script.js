let cache = [];
let capacity = 0;

// ---------- Render Cache ----------
function renderCache(hitIndex = -1) {
    const container = document.getElementById("cache");
    container.innerHTML = "";

    cache.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "block";

        if (index === hitIndex) div.classList.add("hit");
        if (index === cache.length - 1) div.classList.add("evicted");

        div.innerText = `${item.key}:${item.value}`;
        container.appendChild(div);
    });
}

// ---------- PUT ----------
function put() {
    if (capacity === 0) {
        capacity = parseInt(document.getElementById("capacity").value);
        if (!capacity || capacity <= 0) {
            showMessage("Enter a valid cache capacity");
            return;
        }
    }

    let key = document.getElementById("key").value.trim();
    let value = document.getElementById("value").value.trim();

    if (!key || !value) {
        showMessage("Key and Value are required");
        return;
    }

    let index = cache.findIndex(item => item.key === key);

    if (index !== -1) {
        cache.splice(index, 1);
        showMessage(`Updated key "${key}"`);
    } else if (cache.length === capacity) {
        cache.pop();
        showMessage(`Cache full → LRU evicted`);
    } else {
        showMessage(`Inserted (${key}, ${value})`);
    }

    cache.unshift({ key, value });
    renderCache(0);
}

// ---------- GET ----------
function get() {
    let key = document.getElementById("key").value.trim();
    let index = cache.findIndex(item => item.key === key);

    if (index === -1) {
        showMessage(`GET (${key}) → MISS`);
        return;
    }

    let item = cache.splice(index, 1)[0];
    cache.unshift(item);
    renderCache(0);
    showMessage(`GET (${key}) → HIT (${item.value})`);
}

// ---------- Message ----------
function showMessage(msg) {
    document.getElementById("message").innerText = msg;
}
// >>>>>>> 44d0fde0398db6637a5530404dd6ce18d002cf7b
