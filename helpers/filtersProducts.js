const filterProducts = (blood, allowed, category, query) =>{
    let filters = {}
    if(allowed !== 'all') filters = {[`groupBloodNotAllowed.${blood}`]: allowed}
    if(query) filters = {...filters, title: {$regex: query, $options: 'i'}}
    if(category) filters = {...filters,category}
    return filters
  }

module.exports = {filterProducts}