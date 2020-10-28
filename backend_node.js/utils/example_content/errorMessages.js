
function printErrorMessage(title, ex) {
    if(ex.errors) return console.log(title, ex.errors.map(e => e.message), '=> Skipping...');
    if(ex.parent) return console.log(title, `Code: ${ex.parent.code} - ${ex.parent.sqlMessage}`, '=> Skipping...');
    console.log(ex);
}

module.exports  = printErrorMessage;