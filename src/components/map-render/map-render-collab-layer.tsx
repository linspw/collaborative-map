/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';
import * as Y from 'yjs';

import { WebrtcProvider } from 'y-webrtc';
import { LatLng } from 'leaflet';
import type { User } from '@custom-types';
import { useSessionStore } from '@stores/use-user-store';
import { createLeafletIcon } from '@utils/icons/create-leaflet-icon';
import { Avatar, AvatarGroup, Card, Tooltip, Typography } from '@mui/material';
import { getFirstLetters } from '@utils/names';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('your-room-name', ydoc, {
  signaling: ['https://collab-map.zeabur.app//'],
});

interface CollabUser extends User {
  latLng: LatLng;
}

const generateSvgCursor = (name: string, color: string) => {
  const svg = `
    <svg width="2075" height="750" viewBox="0 0 2075 750" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_1019_22" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="85" width="520" height="520">
        <path d="M0 85V605H520V85H0Z" fill="white"/>
      </mask>
    <g mask="url(#mask0_1019_22)">
      <path d="M1.53892 121.866L158.488 586.011C165.937 608.038 195.518 611.868 208.287 592.396L308.203 440.022L134.441 226.464C129.546 220.505 135.505 214.547 141.463 219.441L355.022 393.203L507.395 293.287C526.868 280.518 523.037 250.938 501.011 243.489L36.8659 86.5394C14.9461 79.091 -5.90954 99.9466 1.53892 121.866Z" fill="${color}"/>
    </g>
      <text fill="${color}" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="500" letter-spacing="0em"><tspan x="667" y="550">${name}</tspan></text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`; // Convertendo para base64
};

export const MapRenderCollabLayer = () => {
  const [users, setUsers] = useState<CollabUser[]>([]);
  const { user, setCurrentUser } = useSessionStore((state) => state);

  const getUserPositionPayload = useCallback(
    (latLng: LatLng): CollabUser => {
      return {
        ...user,
        latLng,
      };
    },
    [user]
  );

  useEffect(() => {
    setCurrentUser({ clientID: provider.awareness.clientID });
    provider.awareness.setLocalStateField('user', getUserPositionPayload(new LatLng(0, 0)));

    provider.awareness.on('change', () => {
      const stateValues = Array.from(provider.awareness.getStates().values());
      const otherUsers = stateValues
        .map((a) => a.user)
        .filter((user) => user.clientID !== provider!.awareness.clientID);

      setUsers(otherUsers);
    });
  }, []);

  useMapEvent('mousemove', (event) => {
    provider.awareness.setLocalStateField(
      'user',
      getUserPositionPayload(new LatLng(event.latlng.lat, event.latlng.lng, event.latlng.alt))
    );
  });

  return (
    <>
      {users.map((item) => {
        return (
          <Marker
            key={item.clientID}
            position={item.latLng}
            icon={createLeafletIcon({
              iconUrl: generateSvgCursor('Stuart', item.color),
            })}
          >
            {item.name && (
              <Popup>
                <span>{item.name}</span>
              </Popup>
            )}
          </Marker>
        );
      })}

      {users.length && (
        <Card sx={{ padding: '24px', position: 'absolute', right: 24, bottom: 24, zIndex: 1000 }}>
          <Typography gutterBottom>Users with you:</Typography>

          <AvatarGroup max={4}>
            {users.map((item) => {
              return (
                <Tooltip key={item.clientID} title={item.name}>
                  <Avatar sx={{ backgroundColor: item.color }}>{getFirstLetters(item.name)}</Avatar>
                </Tooltip>
              );
            })}
          </AvatarGroup>
        </Card>
      )}
    </>
  );
};
