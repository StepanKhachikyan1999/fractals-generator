/**
 * This script draws a tree on a canvas. The tree can be randomized in various properties
 * such as color, length, branch width, and curve.
 */

// Initialization of global variables
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const btn = document.querySelector(".generate-tree-button")
const downloadBtn = document.getElementById("download-btn")

let curve = 10
let curve2 = 0

/**
 * Draws a tree on the canvas using the bezier curve for branches.
 *
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} len - The length of the branch.
 * @param {number} angle - The angle at which the branch is drawn.
 * @param {number} branchWidth - The width of the branch.
 * @param {string} color1 - The color of the branch.
 * @param {string} color2 - The color of the leaf.
 */
function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath()
    ctx.save()
    
    // Styling
    ctx.strokeStyle = color1
    ctx.fillStyle = color2
    ctx.shadowBlur = 15
    ctx.shadowColor = "rgba(0,0,0,1)"
    ctx.lineWidth = branchWidth

    ctx.translate(startX, startY)
    ctx.rotate((angle * Math.PI) / 180)
    ctx.moveTo(0, 0)

    if (angle < 0) {
        ctx.bezierCurveTo(curve2, -len / 2, curve2, -len / 2, 0, -len)
    } else {
        ctx.bezierCurveTo(curve2, -len / 2, -curve2, -len / 2, 0, -len)
    }

    ctx.stroke()

    // Draw leaves for smaller branches
    if (len < 5) {
        ctx.beginPath()
        ctx.arc(0, -len, 10, 0, Math.PI / 2)
        ctx.fill()
        ctx.restore()
        return
    }

    // Recursive function calls to draw the two sub-branches
    drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6)
    drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6)

    ctx.restore()
}

/**
 * Generates a random tree on the canvas.
 */
function generateRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let centerPointX = canvas.width / 2
    let len = Math.floor(Math.random() * 20 + 100)
    let angle = 0
    let branchWidth = Math.random() * 70 + 1
    let color1 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    let color2 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`

    // Update button background to the branch color
    btn.style.background = color1

    // Update curve values
    curve = Math.random() * 20 + 2
    curve2 = Math.random() * 50 + 0

    drawTree(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2)
}

// Draw the initial tree
drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 15, "brown", "green")

// Add the event listener to generate a random tree upon button click
btn.addEventListener("click", generateRandomTree)

// PNG downloader
downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a')
    link.download = 'tree.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
})


// SETTINGS
// Get the button element that triggers the settings
const settingsBtn = document.getElementById("settings-btn")

// Get the content container for the settings
const settingsContent = document.querySelector(".settings-content")

// Get the various input elements for customizing the tree
const lengthInput = document.getElementById("length")
const branchWidthInput = document.getElementById("branchWidth")
const curve1Input = document.getElementById("curve1")
const curve2Input = document.getElementById("curve2")
const branchColorInput = document.getElementById("branchColor")
const leafColorInput = document.getElementById("leafColor")

/**
 * Toggle the display of the settings content.
 * If the settings are hidden or not displayed, it sets the display to "block" (visible).
 * Otherwise, it hides the settings content.
 */
settingsBtn.addEventListener("click", () => {
    settingsContent.style.display = settingsContent.style.display === "none" || settingsContent.style.display === "" ? "block" : "none"
})

// Add event listeners to update the tree visualization whenever a setting is changed
lengthInput.addEventListener("input", updateTree)
branchWidthInput.addEventListener("input", updateTree)
curve1Input.addEventListener("input", updateTree)
curve2Input.addEventListener("input", updateTree)
branchColorInput.addEventListener("input", updateTree)
leafColorInput.addEventListener("input", updateTree)

/**
 * Update and redraw the tree based on the values from the input settings.
 * This function fetches the values from the input elements and calls the `drawTree` function 
 * to visualize the tree with the given settings.
 */
function updateTree() {
    // Convert input values to the appropriate data types (e.g., number or string)
    let len = +lengthInput.value
    let branchWidth = +branchWidthInput.value
    let curve = +curve1Input.value
    let curve2 = +curve2Input.value
    let branchColor = branchColorInput.value
    let leafColor = leafColorInput.value
    
    // Call the function to draw the tree with the given settings
    drawTree(canvas.width / 2, canvas.height - 80, len, 0, branchWidth, branchColor, leafColor)
}



