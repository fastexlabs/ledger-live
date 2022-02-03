// @flow
import React, { useCallback } from "react";
import { View, StyleSheet, Linking } from "react-native";
import type { AccountLike, Account } from "@ledgerhq/live-common/lib/types";
import { Trans } from "react-i18next";
import type { Transaction } from "@ledgerhq/live-common/lib/families/stellar/types";
import {
  getMainAccount,
  getAccountCurrency,
} from "@ledgerhq/live-common/lib/account";
import { useTheme } from "@react-navigation/native";
import SummaryRow from "../../screens/SendFunds/SummaryRow";
import LText from "../../components/LText";
import CurrencyUnitValue from "../../components/CurrencyUnitValue";
import CounterValue from "../../components/CounterValue";
import ExternalLink from "../../icons/ExternalLink";
import { urls } from "../../config/urls";

type Props = {
  account: AccountLike,
  transaction: Transaction,
  parentAccount: Account,
};

export default function StellarFeeRow({
  account,
  parentAccount,
  transaction,
}: Props) {
  const { colors } = useTheme();
  const extraInfoFees = useCallback(() => {
    Linking.openURL(urls.feesMoreInfo);
  }, []);

  if (transaction.family !== "stellar") return null;
  const fees = transaction.fees;
  const mainAccount = getMainAccount(account, parentAccount);
  const currency = getAccountCurrency(account);

  return (
    <SummaryRow
      onPress={extraInfoFees}
      title={<Trans i18nKey="send.fees.title" />}
      additionalInfo={
        <View>
          <ExternalLink size={12} color={colors.grey} />
        </View>
      }
    >
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.accountContainer}>
          {fees ? (
            <LText style={styles.valueText}>
              <CurrencyUnitValue unit={mainAccount.unit} value={fees} />
            </LText>
          ) : null}
        </View>
        <LText style={styles.countervalue} color="grey">
          {fees ? (
            <CounterValue before="≈ " value={fees} currency={currency} />
          ) : null}
        </LText>
      </View>
    </SummaryRow>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    flexDirection: "row",
  },
  summaryRowText: {
    fontSize: 16,
    textAlign: "right",
  },
  countervalue: {
    fontSize: 12,
  },
  valueText: {
    fontSize: 16,
  },
});
