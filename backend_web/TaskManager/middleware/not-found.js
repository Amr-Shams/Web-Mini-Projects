const not_found = (req, res, next) => {
    res.status(404).json({msg:"Page Not Found"})
}

module.exports = not_found;
