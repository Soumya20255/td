import Tour from '../models/Tour.js';

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, search, featured } = req.query;
    
    let query = {};

    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const tours = await Tour.find(query).populate('category', 'name');
    
    res.json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('category', 'name');
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create tour
// @route   POST /api/tours
// @access  Private/Admin
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    
    res.status(201).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
