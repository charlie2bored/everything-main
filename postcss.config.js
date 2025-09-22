module.exports = {
  plugins: {
    'postcss-preset-env': { stage: 3 },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  }
}

