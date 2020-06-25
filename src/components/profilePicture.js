import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { GitApi } from '../services/axios';

const View = styled.View`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  justify-content: center;
  align-self: center;
  margin-top: 2.5%;
  margin-bottom: 5%;
`;

const ShimmerIcon = styled(ShimmerPlaceHolder)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size * 2}px;
  position: absolute;
`;

const Image = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size * 2}px;
  position: absolute;
`;

const ProfilePicture = props => {
  const [Source, setSource] = useState({});

  async function getInstaProfilePicture() {
    try {
      const response = await GitApi.get('users/pitroldev');
      const uri = response.data.avatar_url;
      setSource({ uri });
    } catch (err) {
      setSource(require('../resources/profile_pic.jpg'));
    }
  }

  useEffect(() => {
    getInstaProfilePicture();
  }, []);

  return (
    <View size={props.size}>
      <ShimmerIcon size={props.size} autoRun={true} />
      <Image size={props.size} source={Source} props={props} />
    </View>
  );
};

export default ProfilePicture;
