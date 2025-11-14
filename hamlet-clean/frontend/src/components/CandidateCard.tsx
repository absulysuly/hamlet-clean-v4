import { Candidate } from '@/types';

interface CandidateCardProps {
  candidate: Candidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {candidate.name}
      </h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Governorate:</span> {candidate.governorate}
        </p>
        {candidate.alliance && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Alliance:</span> {candidate.alliance}
          </p>
        )}
        {candidate.listNumber && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">List #:</span> {candidate.listNumber}
          </p>
        )}
        {candidate.votes > 0 && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Votes:</span> {candidate.votes.toLocaleString()}
          </p>
        )}
      </div>
      {candidate.biography && (
        <p className="mt-4 text-sm text-gray-700 line-clamp-3">
          {candidate.biography}
        </p>
      )}
    </div>
  );
}
