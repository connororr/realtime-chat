import React from 'react';

export const jobTypes = [
  'Air Conditioning',
  'Antenna Services',
  'Appliance Installation',
  'Appliance Repairs',
  'Arborists',
  'Architects',
  'Asbestos Removal',
  'Asphalt Concreting',
  'Awning Suppliers',
  'Awnings',
  'Balustrades',
  'Bamboo Flooring',
  'Bath Resurfacing',
  'Bathroom Accessories',
  'Bathroom Renovations',
  'Blind Suppliers',
  'Blinds',
  'Bricklayers',
  'Builders',
  'Building Certifiers',
  'Building Consultants',
  'Building Designers',
  'Building Inspections',
  'Building Suppliers',
  'Building Surveyors',
  'Cabinet Makers',
  'Carpenters',
  'Carpet Cleaning',
  'Carpet Layers',
  'Carpet Suppliers',
  'Carpets',
  'Carports',
  'Ceilings',
  'Cladding',
  'Commercial Cleaning',
  'Concrete Kerbs',
  'Concrete Resurfacing',
  'Concreting',
  'Curtains',
  'Custom Furniture',
  'Damp Proofing',
  'Decking',
  'Demolition',
  'Door Suppliers',
  'Doors',
  'Drafting',
  'Drains',
  'Electricians',
  'Equipment Hire',
  'Excavation',
  'Fencing',
  'Fireplaces',
  'Floor Coatings',
  'Floor Sanding',
  'Fly Screens',
  'Garages',
  'Garden Designers',
  'Garden Supplies',
  'Gardeners',
  'Gas Fitters',
  'Gates',
  'Gazebo',
  'Glass Balustrades',
  'Glass Suppliers',
  'Glazier',
  'Gutter Cleaning',
  'Gutter Protection',
  'Guttering',
  'Handrails',
  'Handyman',
  'Heaters',
  'Heating Systems',
  'Home Renovations',
  'Home Security',
  'Home Theatre',
  'Hot Water Systems',
  'House Cleaning',
  'IKEA Bathrooms',
  'IKEA Kitchen Installers',
  'Insulation',
  'Interior Decorators',
  'Interior Designers',
  'Irrigation Systems',
  'Joiners',
  'Kitchen Designers',
  'Kitchens',
  'Landscape Architecture',
  'Landscapers',
  'Lawn &amp; Turf',
  'Lawn Mowing',
  'Lighting',
  'Limestone',
  'Locksmiths',
  'Mirrors',
  'Painters',
  'Patios',
  'Pavers',
  'Pergolas',
  'Pest Control',
  'Pest Inspections',
  'Plastering',
  'Plumbers',
  'Pool Fencing',
  'Pool Heating',
  'Pool Maintenance',
  'Pressure Cleaner',
  'Privacy Screens',
  'Rain Water Tanks',
  'Removalists',
  'Render',
  'Rendering',
  'Retaining Walls',
  'Roller Doors',
  'Roller Shutters',
  'Roof Repairs',
  'Roofing',
  'Rubbish Removal',
  'Scaffolding',
  'Security Screen Doors',
  'Shade Sails',
  'Sheds',
  'Shopfitters',
  'Shower Repairs',
  'Shower Screens',
  'Shutters',
  'Skip &amp; Truck Hire',
  'Skylights',
  'Solar Power',
  'Splashbacks',
  'Staircases',
  'Stonemasons',
  'Storage',
  'Structural Engineer',
  'Surveyor',
  'Swimming Pool Builders',
  'Tilers',
  'Timber Flooring',
  'Town Planning Services',
  'Tree Fellers',
  'Trusses',
  'Underfloor Heating Systems',
  'Underpinning',
  'Upholstery Repair',
  'Ventilation',
  'Verandahs',
  'Vinyl &amp; Laminate',
  'Wallpapering',
  'Wardrobes',
  'Water Features',
  'Waterproofing',
  'Window Cleaning',
  'Window Repair',
  'Window Tinting',
  'Windows',
];

export const jobFilter = (props) => (
  <select {...props}>
    <option value="" selected>
      Any
    </option>
    {jobTypes.map(type => (
      <option value={type}>{type}</option>
    ))}
  </select>
);

export const locations = ['ACT', 'NSW', 'SA', 'VIC', 'WA'];

export const locationFilter = ({ className, onChange, style, id }) => (
  <select className={className} onChange={onChange} style={style} id={id}>
    <option value="" disabled selected>
      Location
    </option>
    {locations.map(location => (
      <option value={location}>{location}</option>
    ))}
  </select>
);


export const types = ['Repair','Project'];

export const typeFilter = ({ className, onChange, style, id }) => (
  <select className={className} onChange={onChange} style={style} id={id}>
    <option value="" disabled selected>
      Type
    </option>
    {types.map(types => (
      <option value={types}>{types}</option>
    ))}
  </select>
);

export const Order = ['Relevance','Newest','Oldest','Alphabetical','Highest Bid', 'Lowest Bid'];

export const OrderFilter = ({ className, onChange, style, id }) => (
  <select className={className} onChange={onChange} style={style} id={id}>
    <option value="" disabled selected>
      Order
    </option>
    {Order.map(Order => (
      <option value={Order}>{Order}</option>
    ))}
  </select>
);

export const status = ['Premium','Standard'];

export const statusFilter = ({ className, onChange, style, id }) => (
  <select className={className} onChange={onChange} style={style} id={id}>
    <option value="" disabled selected>
      Job Status
    </option>
    {status.map(status => (
      <option value={status}>{status}</option>
    ))}
  </select>
);




