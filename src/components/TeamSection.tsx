import React from 'react';
import { ExternalLink } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'Sylvia',
      role: 'Social Media Specialist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80-1',
      portfolioUrl: 'https://www.canva.com/design/DAGgOEYXiJ4/7Rg5PjyJw685bXgTIl-uyg/view?utm_content=DAGgOEYXiJ4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hbba2698bf5-1'
    },
    {
      id: '2',
      name: 'Ian',
      role: 'Product Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      portfolioUrl: 'https://kuria.framer.website/'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Meet Your Team</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map(member => (
          <div 
            key={member.id} 
            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
          >
            {/* <img 
              src={member.id} 
              alt={member.id} 
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700"
            /> */}
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
              <a 
                href={member.portfolioUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                View Portfolio
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;