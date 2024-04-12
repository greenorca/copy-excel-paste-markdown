var editor = document.getElementById("editor")

function columnWidth(rows, columnIndex) {
  return Math.max.apply(null, rows.map(function(row) {
    return ('' + row[columnIndex]).length
  }))
}

function looksLikeTable(data) {
  return true
}

editor.addEventListener("paste", function(event) {
  var clipboard = event.clipboardData
  var data = clipboard.getData('text/plain').trim()

  if(looksLikeTable(data)) {
    event.preventDefault()
  }else{
    return
  }

  //var rows = data.split((/[\u0085\u2028\u2029]|\r\n?/g)).map(function(row) {
  var rows = data.split((/\n/g))
  
  var markdownRows = []
  
  nCells = 0;
  
  rows.forEach( (row,index) => {
        
    line = "| "
    
    cells = row.split("\t")
    cells.forEach( cell => {
      if (index == 0){
        line += " **"+ cell.trim() + "** |"
      } else { 
        line += cell + " | "
        }
    })
    nCells = Math.max(nCells, cells.length)
    
    markdownRows.push(line)
    
    if (index == 0){
      line = "|"
      for ( i=0; i < nCells;i++){
        line += "---|"  
      }  
      markdownRows.push(line)
    }
    
  })
  

  event.target.value = markdownRows.join("\n")
  return false
})
