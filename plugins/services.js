import services from '../services';

export default function (context, inject) {
    // Inject to context as $api
    inject('services', services)
  }