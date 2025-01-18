import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';
import * as Y from 'yjs';

import { WebrtcProvider } from 'y-webrtc';
import { LatLng } from 'leaflet';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('your-room-name', ydoc, {
  signaling: ['https://collab-map.zeabur.app//'],
});

interface User {
  clientID: number;
  name: string;
  color: string;
  latLng: LatLng;
}

export const MapRenderCollab = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUserPositionPayload = (latLng: LatLng): User => {
    return {
      clientID: provider.awareness.clientID,
      name: 'Jessé',
      color: 'blue',
      latLng,
    };
  };

  useEffect(() => {
    provider.awareness.setLocalStateField('user', getUserPositionPayload(new LatLng(0, 0, 0)));

    provider.awareness.on('change', () => {
      const stateValues = Array.from(provider.awareness.getStates().values());
      const otherUsers = stateValues.map((a) => a.user);
      // .filter((user) => user.clientID !== provider!.awareness.clientID);

      setUsers(otherUsers);
    });
  }, []);
  useMapEvent('mousemove', (event) => {
    provider.awareness.setLocalStateField(
      'user',
      getUserPositionPayload(new LatLng(event.latlng.lat, event.latlng.lng, event.latlng.alt))
    );
  });

  return users.map((item) => {
    return (
      <Marker key={item.toString()} position={item.latLng}>
        {item.name && (
          <Popup>
            <span>{item.name}</span>
          </Popup>
        )}
      </Marker>
    );
  });
};
