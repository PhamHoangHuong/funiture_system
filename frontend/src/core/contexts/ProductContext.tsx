import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../services/productService';
import { Product } from '../hooks/dataTypes';

