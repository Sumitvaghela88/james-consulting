// Update your React component to use real API calls
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Calendar, Clock, Check, ChevronRight } from "lucide-react";
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/services';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
    price: "",
    image: ""
  });

  // Fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // READ - Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // CREATE - Add new service
  const handleAddService = async () => {
    try {
      setIsAnimating(true);
      const response = await axios.post(API_URL, formData);
      
      if (response.data.success) {
        setServices([...services, response.data.data]);
        closeModal();
        alert('Service added successfully!');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service. Please try again.');
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  // UPDATE - Update existing service
  const handleUpdateService = async () => {
    try {
      const response = await axios.put(`${API_URL}/${formData._id}`, formData);
      
      if (response.data.success) {
        setServices(services.map(s => 
          s._id === formData._id ? response.data.data : s
        ));
        closeModal();
        alert('Service updated successfully!');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service. Please try again.');
    }
  };

  // DELETE - Delete service
  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
        
        if (response.data.success) {
          setServices(services.filter(s => s._id !== id));
          alert('Service deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setIsEditMode(true);
      setFormData(service);
    } else {
      setIsEditMode(false);
      setFormData({ title: "", duration: "", description: "", price: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", duration: "", description: "", price: "", image: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdateService();
    } else {
      handleAddService();
    }
  };

  const viewServiceDetails = (service) => {
    setSelectedService(service);
  };

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchServices}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-light tracking-wider mb-3 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              OUR SERVICES
            </h2>
            <p className="text-gray-600 text-lg">Discover our comprehensive consulting solutions</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold">Add Service</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service._id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                isAnimating ? 'animate-pulse' : ''
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={() => setHoveredCard(service._id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => viewServiceDetails(service)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                  {service.price}
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-full group-hover:translate-x-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(service);
                    }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-blue-100 transition-all shadow-lg hover:scale-110"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteService(service._id);
                    }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-red-100 transition-all shadow-lg hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">{service.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center gap-2 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative inline-flex items-center gap-3 border-2 border-blue-900 text-blue-900 px-12 py-4 text-sm font-semibold tracking-wide rounded-xl overflow-hidden transition-all duration-300 hover:text-white">
            <span className="absolute inset-0 bg-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <Calendar className="relative z-10 w-5 h-5" />
            <span className="relative z-10">Book Free Consultation</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative transform animate-slideUp shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                {isEditMode ? <Edit2 className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {isEditMode ? 'Edit Service' : 'Add New Service'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Service Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter service name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 1 hr"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="$100"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  rows="3"
                  placeholder="Brief description"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://..."
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isEditMode ? 'Update' : 'Add'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Details Full Page */}
      {selectedService && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-fadeIn">
          <div className="max-w-5xl mx-auto p-8">
            <button
              onClick={() => setSelectedService(null)}
              className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 group transition-colors"
            >
              <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-50 transition-all">
                <X className="w-5 h-5" />
              </div>
              <span className="font-semibold">Back to Services</span>
            </button>
            
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-96">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-bold mb-4">
                    {selectedService.price}
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-2">
                    {selectedService.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5" />
                    <span className="text-lg">{selectedService.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <Check className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
                    <p className="text-gray-600 text-sm">Expert guidance from industry leaders</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <Check className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Customized</h3>
                    <p className="text-gray-600 text-sm">Tailored solutions for your needs</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <Check className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Results-Driven</h3>
                    <p className="text-gray-600 text-sm">Measurable outcomes guaranteed</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Service</h2>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  {selectedService.description}. Our comprehensive approach ensures that you receive 
                  personalized attention and strategic insights that drive real business results. 
                  We combine industry expertise with innovative methodologies to help you achieve 
                  your goals efficiently and effectively.
                </p>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book This Service
                  </button>
                  <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all font-semibold">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;