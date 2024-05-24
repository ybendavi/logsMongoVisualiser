const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    type: { type: String, required: true },
    method: { type: String, default: '' },
    ip: { type: String, default: '' },
    url: { type: String, default: '' },
    header: { type: Map, of: String, default: {} },
    httpversion: { type: String, default: '' },
    statutcode: { type: String, default: '' },
    error: { type: String, default: '' },
    message: { type: String, default: '' },
    timestamp: { type: Number, default: () => Date.now()},
});

// Création d'un index de texte pour la recherche
logSchema.index({
    type: 'text',
    method: 'text',
    ip: 'text',
    url: 'text',
    error: 'text',
    message: 'text'
});

module.exports = mongoose.model('Log', logSchema);

