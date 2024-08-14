"use client"
import React, { useState, useEffect } from 'react';


export function GetMembers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const respone = await fetch ("https://jsonplaceholder.typicode.com/users");
            const data = await respone.json();
            setUsers(data);
        }

        getUsers();
    },[])

    return users;
}

export function GetMembersEdit(userid) {
    const [usersEdit, setUsersEdit] = useState(null);

    useEffect(() => {
        async function getUsersEdit() {
            const respone = await fetch (`https://jsonplaceholder.typicode.com/users/${userid}`);
            const data = await respone.json();
            setUsersEdit(data);
        }

        getUsersEdit();
    },[userid])

    return usersEdit;
}

export async function UpdateMember(userid, updateData) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating member:', error);
    }
  }

  export async function AddMember(addData) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error Add member:', error);
    }
  }


  


export function GetExchanges() {
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        async function getExchangesRank() {
            const respone = await fetch ("https://api.coingecko.com/api/v3/exchanges");
            const data = await respone.json();
            setExchanges(data);
        }

        getExchangesRank();
    },[])

    return exchanges;
}


export function GetMarketTrending() {
    const [marketTrending, setMarketTrending] = useState([]);

    useEffect(() => {
        async function getCoinsMarketTrending() {
            const respone = await fetch ("https://api.coingecko.com/api/v3/search/trending");
            const data = await respone.json();
            setMarketTrending(data.coins);
        }

        getCoinsMarketTrending();
    },[])

    return marketTrending;
}







