import axios from 'axios';
import { API_BASE_URL } from '../config';

// Types
export interface TripLocation {
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface TripActivity {
  name: string;
  type: string;
  location: TripLocation;
  start_time: string;
  end_time: string;
  description: string;
  cost: number;
}

export interface TripMeal {
  type: string;
  venue: string;
  description: string;
  cost: number;
}

export interface TripAccommodation {
  name: string;
  type: string;
  description: string;
  cost: number;
}

export interface TripDay {
  day: number;
  date: string;
  activities: TripActivity[];
  meals: TripMeal[];
  accommodation: TripAccommodation;
}

export interface TripBudget {
  currency: string;
  total_estimate: number;
  accommodation: number;
  transportation: number;
  food: number;
  activities: number;
  other: number;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  days: TripDay[];
  budget: TripBudget;
  notes?: string;
  created_at: string;
  user_id: number;
}

export interface TripSummary {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface GenerateTripRequest {
  destination: string;
  start_date: string;
  end_date: string;
  budget: string;
  travel_style: string[];
  accommodation: string[];
  transportation: string[];
  activities: string[];
  food_preferences: string[];
  special_requests?: string;
}

export interface DestinationRecommendationRequest {
  interests: string[];
  budget: string;
  duration: string;
  season: string;
  travel_style: string[];
}

export interface DestinationRecommendation {
  name: string;
  country: string;
  description: string;
  highlights: string[];
  best_time_to_visit: string;
  estimated_cost: string;
}

// Trip service
const tripService = {
  // 获取当前用户的所有旅行计划
  getAllTrips: async (): Promise<TripSummary[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/trips/user`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  },

  // 获取指定ID的旅行计划
  getTripById: async (id: string): Promise<Trip> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/trips/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching trip with ID ${id}:`, error);
      throw error;
    }
  },

  // 生成旅行计划
  generateTrip: async (tripData: GenerateTripRequest): Promise<Trip> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/trips/generate`, tripData);
      return response.data;
    } catch (error) {
      console.error('Error generating trip:', error);
      throw error;
    }
  },

  // 更新旅行计划
  updateTrip: async (id: string, tripData: Partial<GenerateTripRequest>): Promise<Trip> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/trips/${id}`, tripData);
      return response.data;
    } catch (error) {
      console.error(`Error updating trip with ID ${id}:`, error);
      throw error;
    }
  },

  // 删除旅行计划
  deleteTrip: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/api/trips/${id}`);
    } catch (error) {
      console.error(`Error deleting trip with ID ${id}:`, error);
      throw error;
    }
  },

  // 生成目的地推荐
  getDestinationRecommendations: async (requestData: DestinationRecommendationRequest): Promise<DestinationRecommendation[]> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/recommendations/destinations`, requestData);
      return response.data.destinations;
    } catch (error) {
      console.error('Error getting destination recommendations:', error);
      throw error;
    }
  },
};

export default tripService;
