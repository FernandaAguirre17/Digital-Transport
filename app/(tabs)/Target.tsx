import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Modal,
  TextInput 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BankCardTransfers = () => {
  const [saldo, setSaldo] = useState(15750.45);
  const [transferModal, setTransferModal] = useState(false);
  const [rechargeModal, setRechargeModal] = useState(false);
  const [montoTransferencia, setMontoTransferencia] = useState('');
  const [montoRecarga, setMontoRecarga] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');

  const cardData = {
    numero: '4532 7812 3456 7890',
    titular: 'Juan Pérez Martínez',
    fechaExpiracion: '12/27',
  };

  const realizarTransferencia = () => {
    if (montoTransferencia && cuentaDestino) {
      const monto = parseFloat(montoTransferencia);
      if (monto > 0 && monto <= saldo) {
        setSaldo(saldo - monto);
        setTransferModal(false);
        setMontoTransferencia('');
        setCuentaDestino('');
        alert('Transferencia realizada con éxito');
      } else {
        alert('Monto inválido o saldo insuficiente');
      }
    }
  };

  const realizarRecarga = () => {
    if (montoRecarga) {
      const monto = parseFloat(montoRecarga);
      if (monto > 0) {
        setSaldo(saldo + monto);
        setRechargeModal(false);
        setMontoRecarga('');
        alert('Recarga realizada con éxito');
      } else {
        alert('Monto de recarga inválido');
      }
    }
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

        {/* Saldo Actual */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View style={styles.balanceIconContainer}>
                <FontAwesome5 name="dollar-sign" size={16} color="#10B981" />
              </View>
              <Text style={styles.balanceTitle}>Saldo Actual</Text>
              <Text style={styles.balanceAmount}>
                ${saldo.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setTransferModal(true)}
          >
            <FontAwesome5 name="exchange-alt" size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Transferir</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setRechargeModal(true)}
          >
            <FontAwesome5 name="mobile-alt" size={20} color="#10B981" />
            <Text style={styles.actionButtonText}>Recargar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de Transferencia */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={transferModal}
          onRequestClose={() => setTransferModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Transferencia</Text>
              <TextInput
                style={styles.input}
                placeholder="Número de cuenta destino"
                value={cuentaDestino}
                onChangeText={setCuentaDestino}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Monto a transferir"
                value={montoTransferencia}
                onChangeText={setMontoTransferencia}
                keyboardType="numeric"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={styles.modalButtonCancel}
                  onPress={() => setTransferModal(false)}
                >
                  <Text style={styles.modalButtonCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButtonConfirm}
                  onPress={realizarTransferencia}
                >
                  <Text style={styles.modalButtonConfirmText}>Transferir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Recarga */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={rechargeModal}
          onRequestClose={() => setRechargeModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Recarga</Text>
              <TextInput
                style={styles.input}
                placeholder="Monto a recargar"
                value={montoRecarga}
                onChangeText={setMontoRecarga}
                keyboardType="numeric"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={styles.modalButtonCancel}
                  onPress={() => setRechargeModal(false)}
                >
                  <Text style={styles.modalButtonCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButtonConfirm}
                  onPress={realizarRecarga}
                >
                  <Text style={styles.modalButtonConfirmText}>Recargar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding:4,
  },
  cardContainer: {
    margin:20,
    padding: 16,
  },
  bankCard: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  cardBrand: {
    color: 'white',
    fontSize: 14,
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
  balanceContainer: {
    paddingHorizontal: 16
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  actionButtonText: {
    marginLeft: 8,
    color: '#1F2937',
    fontWeight: '600'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButtonCancel: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  modalButtonCancelText: {
    color: '#4B5563',
    fontWeight: '600'
  },
  modalButtonConfirm: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  modalButtonConfirmText: {
    color: 'white',
    fontWeight: '600'
  }
});

export default BankCardTransfers;