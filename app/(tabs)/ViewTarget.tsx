import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BankCardDetails = () => {
  // Datos simulados de una tarjeta bancaria
  const cardData = {
    numero: '4532 7812 3456 7890',
    titular: 'Juan Pérez Martínez',
    fechaExpiracion: '12/27',
    saldoActual: 15750.45,
    ultimosMovimientos: [
      { 
        fecha: '15/03/2025', 
        descripcion: 'Compra Supermercado', 
        monto: -125.60,
        tipo: 'gasto'
      },
      { 
        fecha: '12/03/2025', 
        descripcion: 'Transferencia Recibida', 
        monto: 2500.00,
        tipo: 'ingreso'
      },
      { 
        fecha: '10/03/2025', 
        descripcion: 'Pago Luz', 
        monto: -87.30,
        tipo: 'gasto'
      }
    ]
  };

  const formatCurrency = (monto) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(monto);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Tarjeta Bancaria */}
        <View style={styles.cardContainer}>
          <View style={styles.bankCard}>
            <View style={styles.cardHeader}>
              <FontAwesome5 name="credit-card" size={24} color="white" />
              <Text style={styles.cardBrand}>Visa</Text>
            </View>
            <Text style={styles.cardNumber}>{cardData.numero}</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>Titular</Text>
                <Text style={styles.cardText}>{cardData.titular}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Expira</Text>
                <Text style={styles.cardText}>{cardData.fechaExpiracion}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Resumen Financiero */}
        <View style={styles.summaryContainer}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View style={styles.balanceIconContainer}>
                <FontAwesome5 name="dollar-sign" size={16} color="#10B981" />
              </View>
              <Text style={styles.balanceTitle}>Saldo Actual</Text>
              <Text style={styles.balanceAmount}>
                {formatCurrency(cardData.saldoActual)}
              </Text>
            </View>
          </View>

          {/* Últimos Movimientos */}
          <View style={styles.movementsContainer}>
            <Text style={styles.movementsTitle}>Últimos Movimientos</Text>
            {cardData.ultimosMovimientos.map((movimiento, index) => (
              <View key={index} style={styles.movementItem}>
                <View style={styles.movementDetails}>
                  <FontAwesome5 
                    name={movimiento.tipo === 'gasto' ? 'arrow-down' : 'arrow-up'} 
                    size={16} 
                    color={movimiento.tipo === 'gasto' ? '#EF4444' : '#10B981'}
                  />
                  <Text style={styles.movementDescription}>
                    {movimiento.descripcion}
                  </Text>
                </View>
                <Text style={[
                  styles.movementAmount,
                  movimiento.tipo === 'gasto' 
                    ? styles.expenseAmount 
                    : styles.incomeAmount
                ]}>
                  {formatCurrency(movimiento.monto)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding:8,
  },
  cardContainer: {
    padding: 16,
    margin:20
  },
  bankCard: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  cardBrand: {
    color: 'white',
    fontSize: 14
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12
  },
  cardText: {
    color: 'white',
    fontSize: 14
  },
  summaryContainer: {
    padding: 16
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  balanceIconContainer: {
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    padding: 8
  },
  balanceTitle: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 8
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981'
  },
  movementsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  movementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937'
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  movementDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  movementDescription: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563'
  },
  movementAmount: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  expenseAmount: {
    color: '#EF4444'
  },
  incomeAmount: {
    color: '#10B981'
  }
});

export default BankCardDetails;