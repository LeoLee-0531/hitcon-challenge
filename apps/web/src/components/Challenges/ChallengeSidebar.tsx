'use client';

import { useState } from 'react';
import type { Challenge } from '@/types/challenge';

interface ChallengeSidebarProps {
  challengesList: Challenge[];
  selectedChallenge: Challenge;
  setSelectedChallenge: (challenge: Challenge) => void;
  isMobile: boolean;
}

function ChallengeIcon({ completed }: { completed: boolean }) {
  const [hovered, setHovered] = useState(false);
  const src = completed
    ? hovered ? '/completeHover.svg' : '/complete.svg'
    : hovered ? '/incompleteHover.svg' : '/incomplete.svg';

  return (
    <img
      className="sidebar-icon"
      src={src}
      alt="challenge status"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}

export default function ChallengeSidebar({
  challengesList,
  selectedChallenge,
  setSelectedChallenge,
  isMobile,
}: ChallengeSidebarProps) {
  if (isMobile) {
    return (
      <div className="sidebar-container-mobile">
        <div className="sidebar-row">
          {challengesList.slice(0, 4).map((challenge) => (
            <div
              key={challenge.id}
              className={`challenge-item-mobile ${
                selectedChallenge.id === challenge.id ? 'challenge-active' : ''
              }`}
              onClick={() => setSelectedChallenge(challenge)}
            >
              <ChallengeIcon completed={challenge.completed} />
              <span className="challenge-title-mobile">{challenge.title}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-row">
          {challengesList.slice(4).map((challenge) => (
            <div
              key={challenge.id}
              className={`challenge-item-mobile ${
                selectedChallenge.id === challenge.id ? 'challenge-active' : ''
              }`}
              onClick={() => setSelectedChallenge(challenge)}
            >
              <ChallengeIcon completed={challenge.completed} />
              <span className="challenge-title-mobile">{challenge.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {challengesList.map((challenge, index) => (
        <div
          key={challenge.id}
          className="sidebar-box-desktop"
          onClick={() => setSelectedChallenge(challenge)}
        >
          <ChallengeIcon completed={challenge.completed} />
          <span className="font-bold sidebar-text-desktop">{challenge.title}</span>
          {index < challengesList.length - 1 && (
            <div className="sidebar-line-desktop" />
          )}
        </div>
      ))}
    </div>
  );
}