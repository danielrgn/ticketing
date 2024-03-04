import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
      withCredentials: true,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
