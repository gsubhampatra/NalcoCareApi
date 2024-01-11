

export const isAdmin = async (req, res, next) => {
    try {
        const { user } = req.user
        if (user.role === "admin") {
            next()
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            massage: error.massage
        })
    }
}